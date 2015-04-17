package models

import (
	// "encoding/json"
	// "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	// "log"
	// "net/http"
)

type Media struct {
	Id       bson.ObjectId   `bson:"_id,omitempty"`
	Type     string          `bson:"type"` // image, audio, video
	Src      string          `bson:"src"`
	Name     string          `bson:"name"`
	Size     string          `bson:"size"`
	Author   bson.ObjectId   `bson:"author"`
	Projects []bson.ObjectId `bson:"projects"`
}

func init() {

}
