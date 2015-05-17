package gortfolio

import (
	// "encoding/json"
	// "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	// "log"
	// "net/http"
)

type Portfolio struct {
	Id            bson.ObjectId   `bson:"_id,omitempty"`
	PortfolioType string          `bson:"type"` // video, iilustration, design, paint,
	Medias        []bson.ObjectId `bson:"medias"`
	Name          string          `bson:"name"`
	Description   string          `bson:"Description"`
	Viewed        int             `bson:"viewed"`
	Voted         int             `bson:"voted"`
	Cards         []PortfolioCard `bson:"cards"`
}

type PortfolioCard struct {
	Media       bson.ObjectId `bson:"media"`
	Type        string        `bson:"type"` // image, audio, video
	Src         string        `bson:"src"`
	Description string        `bson:"description"`
}

func init() {

}
