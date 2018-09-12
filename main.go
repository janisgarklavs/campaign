package main

import (
	"database/sql"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/rs/cors"

	"github.com/julienschmidt/httprouter"
	"github.com/lib/pq"
)

type Campaign struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Goal      string    `json:"goal"`
	Budget    int       `json:"total_budget"`
	Status    string    `json:"status"`
	Platforms Platforms `json:"platforms"`
}

type Platforms struct {
	Facebook  *Platform `json:"facebook,omitempty"`
	Instagram *Platform `json:"instagram,omitempty"`
	Google    *Platform `json:"google,omitempty"`
}

type UnixNanoTime time.Time

func (t *UnixNanoTime) UnmarshalJSON(s []byte) error {

	q, err := strconv.ParseInt(string(s), 10, 64)
	if err != nil {
		return err
	}
	*(*time.Time)(t) = time.Unix(q/1000, 0)
	return nil
}

type Platform struct {
	Status          string          `json:"status"`
	TotalBudget     int             `json:"total_budget"`
	RemainingBudget int             `json:"remaining_budget"`
	DateStart       UnixNanoTime    `json:"start_date"`
	DateEnd         UnixNanoTime    `json:"end_date"`
	TargetAudience  json.RawMessage `json:"target_audiance"`
	Creatives       json.RawMessage `json:"creatives"`
	Insights        json.RawMessage `json:"insights"`
}

var db *sql.DB

func init() {
	file, err := os.Open("data.json")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	content, err := ioutil.ReadAll(file)
	if err != nil {
		log.Fatal(err)
	}
	var campaigns []Campaign

	err = json.Unmarshal(content, &campaigns)
	if err != nil {
		log.Fatal(err)
	}

	db, err = sql.Open("postgres", "postgres://postgres:community@localhost/nanos?sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}

	if _, err = db.Exec("DROP TABLE IF EXISTS campaign_platforms; DROP TABLE IF EXISTS campaigns;"); err != nil {
		log.Fatal(err)
	}

	if _, err = db.Exec(`
	create table if not exists campaigns
	(
		id bigint not null
			constraint campaigns_pkey
				primary key,
		name text not null,
		goal text not null,
		total_budget integer not null,
		platforms text[] not null
	);
	alter table campaigns owner to postgres;
	create table if not exists campaign_platforms
	(
		campaign_id bigint not null
			constraint platforms_campaigns_id_fk
				references campaigns,
		platform_type text not null,
		status text not null,
		total_budget integer not null,
		remaining_budget integer not null,
		start_date timestamp not null,
		end_date timestamp not null,
		target_audience json not null,
		creatives json not null,
		insights json not null,
		constraint campaign_platforms_pk
			primary key (campaign_id, platform_type)
	);
	alter table  campaign_platforms owner to postgres ;
	`); err != nil {
		log.Fatal(err)
	}

	campaignInsert, err := db.Prepare("INSERT INTO campaigns (id, name, goal, total_budget, platforms) VALUES ($1, $2, $3, $4, $5)")
	if err != nil {
		log.Fatal(err)
	}
	platformInsert, err := db.Prepare("INSERT INTO campaign_platforms (campaign_id, platform_type, status, total_budget, remaining_budget, start_date, end_date, target_audience, creatives, insights) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)")
	if err != nil {
		log.Fatal(err)
	}

	for _, c := range campaigns {

		_, err := campaignInsert.Exec(
			c.ID,
			c.Name,
			c.Goal,
			c.Budget,
			pq.Array(c.usedPlatforms()),
		)
		if err != nil {
			log.Fatal(err)
		}

		if c.Platforms.Facebook != nil {
			if err := c.Platforms.Facebook.insert(platformInsert, c.ID, "facebook"); err != nil {
				log.Fatal(err)
			}
		}
		if c.Platforms.Instagram != nil {
			if err := c.Platforms.Instagram.insert(platformInsert, c.ID, "instagram"); err != nil {
				log.Fatal(err)
			}
		}
		if c.Platforms.Google != nil {
			if err := c.Platforms.Google.insert(platformInsert, c.ID, "google"); err != nil {
				log.Fatal(err)
			}
		}
	}

}

func (c *Campaign) usedPlatforms() []string {
	platforms := []string{}
	if c.Platforms.Facebook != nil {
		platforms = append(platforms, "facebook")
	}
	if c.Platforms.Instagram != nil {
		platforms = append(platforms, "instagram")
	}
	if c.Platforms.Google != nil {
		platforms = append(platforms, "google")
	}
	return platforms
}

func (p *Platform) insert(stmt *sql.Stmt, campaignID int, platformType string) error {

	_, err := stmt.Exec(
		campaignID,
		platformType,
		p.Status,
		p.TotalBudget,
		p.RemainingBudget,
		time.Time(p.DateStart),
		time.Time(p.DateEnd),
		p.TargetAudience,
		p.Creatives,
		p.Insights,
	)
	return err
}

func main() {

	router := httprouter.New()
	router.GET("/campaign", IndexHandler)
	router.GET("/campaign/:id", DetailsHandler)
	handler := cors.Default().Handler(router)
	log.Fatal(http.ListenAndServe(":8081", handler))
}

func IndexHandler(res http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	if req.Method != "GET" {
		http.NotFound(res, req)
		return
	}
	row := db.QueryRow("SELECT json_agg(json_build_object('id',id,'name', name,'goal', goal, 'total_budget', total_budget, 'platforms', platforms)) as data FROM campaigns;")
	var campaigns []byte
	if err := row.Scan(&campaigns); err != nil {
		log.Fatal(err)
	}

	res.Write(campaigns)
}

func DetailsHandler(res http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	if req.Method != "GET" {
		http.NotFound(res, req)
		return
	}
	row := db.QueryRow(`SELECT 
		json_build_object(
		  'id',id,
		  'name', name,
		  'goal', goal,
		  'total_budget', total_budget,
		  'platforms', (
			SELECT json_agg(
					 json_build_object(
					   cp.platform_type, json_build_object(
										   'status', cp.status,
										   'total_budget', cp.total_budget,
										   'remaining_budget', cp.remaining_budget,
										   'start_date', start_date,
										   'end_date', end_date,
										   'target_audience', target_audience,
										   'creatives', creatives,
										   'insights', insights)
						 )
					   )FROM campaign_platforms cp
			WHERE cp.campaign_id = c.id
		  )
		 )
		FROM campaigns c WHERE c.id = $1`, ps.ByName("id"))
	var details []byte
	if err := row.Scan(&details); err != nil {
		log.Fatal(err)
	}

	res.Write(details)
}
