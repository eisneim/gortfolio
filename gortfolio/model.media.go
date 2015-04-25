package gortfolio

import (
	// "encoding/json"
	// "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	// "log"
	// "net/http"
)

type Media struct {
	Id           bson.ObjectId   `bson:"_id,omitempty"`
	Type         string          `bson:"type"` // image, audio, video
	Src          string          `bson:"src"`
	Name         string          `bson:"name"`
	Size         string          `bson:"size"`
	Author       bson.ObjectId   `bson:"author"`
	ProjectIDs   []bson.ObjectId `bson:"projectIDs"`
	PortfolioIDs []bson.ObjectId `bson:"portfolioIDs"`
}

func init() {

}
