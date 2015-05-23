package config

import (
	"gopkg.in/mgo.v2"
)

func GetDB() (*mgo.Database, *mgo.Session) {
	/*
		SessionDB, err := mgo.Dial("localhost")
		if err != nil {
			panic(err)
		}
		defer SessionDB.Close()

		Optional. Switch the SessionDB to a monotonic behavior.
		SessionDB.SetMode(mgo.Monotonic, true)

		DB = SessionDB.DB("gortfolio")
		ColUser = DB.C("users")
	*/
	config := GetConfig()

	session, err := mgo.Dial(config.Host)
	if err != nil {
		panic(err.Error())
	}
	database := session.DB(config.DB)
	return database, session

}
