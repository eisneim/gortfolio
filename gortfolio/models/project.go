package models

import (
	// "encoding/json"
	// "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	// "log"
	// "net/http"
)

type Project struct {
	Id          bson.ObjectId   `bson:"_id,omitempty"`
	Author      bson.ObjectId   `bson:"author"`
	Medias      []bson.ObjectId `bson:"medias"`
	Name        string          `bson:"name"`
	Description string          `bson:"Description"`
	Viewed      int             `bson:"viewed"`
	Voted       int             `bson:"voted"`
	Cards       []projectCard   `bson:"cards"`
}

type projectCard struct {
	Media       bson.ObjectId `bson:"media"`
	Type        string        `bson:"type"` // image, audio, video
	Src         string        `bson:"src"`
	Description string        `bson:"description"`
}

func init() {

}
