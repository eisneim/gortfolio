package controllers

import (
	// "fmt"
	"github.com/julienschmidt/httprouter"
	"gopkg.in/mgo.v2/bson"
	"log"
	"net/http"
	"time"
)

func UserLogin(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	type Person struct {
		Id         bson.ObjectId `bson:"_id,omitempty" json:"-"`
		FirstName  string        `bson:"firstName" json:"firstName"`
		MiddleName string        `bson:"middleName,omitempty" json:"middleName,omitempty"`
		LastName   string        `bson:"lastName" json:"lastName"`
		Inserted   time.Time     `bson:"inserted" json:"-"`
	}

	// err = ColUser.Insert(&Person{"Ale", "+55 53 8116 9639"},
	//            &Person{"Cla", "+55 53 8402 8510"})
	// if err != nil {
	//         log.Fatal(err)
	// }

	result := Person{}
	err = ColUser.Find(bson.M{"phone": "13472783207"}).One(&result)
	if err != nil {
		log.Fatal(err)
	}

	R.JSON(w, http.StatusOK, result)
}

func Test(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {

	type book struct {
		Title  string `json:"title"`
		Author string `json:"author"`
		Id     int    `json:"id"`
	}
	var books = make([]book, 0)

	books = append(books, book{"Ender's Game", "Orson Scott Card", 1})
	books = append(books, book{"Code Complete", "Steve McConnell", 2})
	books = append(books, book{"World War Z", "Max Brooks", 3})

	// w.Write(books)
	// fmt.Fprint(w, books)
	R.JSON(w, http.StatusOK, books)
}
