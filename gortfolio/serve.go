package gortfolio

import (
	"fmt"
	// "io/ioutil"
	"html/template"
	"log"
	"net/http"
	// "strconv"
	// router
	"github.com/gorilla/mux"
	// "github.com/eisneim/gortfolio/gortfolio/controllers"
)

var (
	templates *template.Template
)

func init() {
	templates = template.Must(
		template.ParseFiles("./gortfolio/views/index.html"),
	)
}

func Serve(port int, dir string) {
	// serving file
	fileHandler := http.FileServer(http.Dir(dir))

	// setup routes
	rt := mux.NewRouter()
	// rt.Handle("/", http.RedirectHandler("/static/", 302))
	rt.HandleFunc("/", renderIndex)

	for _, route := range routes {
		rt.Handle(route.URL, route.Handler).Methods(route.Method)
	}

	// static files
	rt.PathPrefix("/static/").Handler(http.StripPrefix("/static", fileHandler))

	http.Handle("/", rt)

	log.Printf("Running on port %d\n", port)

	err := http.ListenAndServe(fmt.Sprintf("127.0.0.1:%d", port), nil)
	fmt.Println(err.Error())
}

func renderIndex(w http.ResponseWriter, r *http.Request) {
	templates.ExecuteTemplate(w, "index.html", nil)
}
