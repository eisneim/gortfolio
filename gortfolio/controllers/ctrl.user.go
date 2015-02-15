package controllers

import (
	"fmt"
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func UserLogin(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	fmt.Fprint(w, `{"msg":"this should be a login page"}`)
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
