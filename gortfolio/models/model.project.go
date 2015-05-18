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
	MediaIDs    []bson.ObjectId `bson:"medias"`
	Name        string          `bson:"name"`
	Cover       bson.ObjectId   `bson:"cover"`
	Description string          `bson:"description"`
	ViewCount   int             `bson:"viewed"`
	VoteCount   int             `bson:"voted"`
	Cards       []projectCard   `bson:"cards"`
	Detail      string          `bson:"detail"`
}

type projectCard struct {
	Media       bson.ObjectId `bson:"media"`
	Type        string        `bson:"type"` // image, audio, video
	Src         string        `bson:"src"`
	Description string        `bson:"description"`
}

func init() {

}
