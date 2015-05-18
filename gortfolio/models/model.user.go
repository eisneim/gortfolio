package models

import (
	// "encoding/json"
	// "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	// "log"
	// "net/http"
)

type User struct {
	Id       bson.ObjectId   `bson:"_id,omitempty"`
	Username string          `bson:"username"`
	Email    string          `bson:"email"`
	Avatar   string          `bson:"avatar"`
	Security userSecurity    `bson:"security"`
	Posts    []bson.ObjectId `bson:"posts"`
}
type userSecurity struct {
	Salt string `bson:"salt"`
	Hash string `bson:"hash"`
}

// type userPosts [ bson.ObjectId ]

func init() {

}
