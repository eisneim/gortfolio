package gortfolio

import (
	"fmt"
	// "io/ioutil"
	"html/template"
	"log"
	"net/http"
	// "strconv"
	// router
	"github.com/julienschmidt/httprouter"
	// "github.com/eisneim/gortfolio/gortfolio/controllers"
)

var (
	templates *template.Template
	Router    = httprouter.New()
)

func init() {
	templates = template.Must(
		template.ParseFiles("./gortfolio/views/index.html"),
	)
}

func Serve(port int, dir string) {

	// Router.Handle("/", http.RedirectHandler("/static/", 302))
	Router.GET("/", renderIndex)

	// static files
	Router.NotFound = http.FileServer(http.Dir(dir)).ServeHTTP

	log.Printf("Running on port %d\n", port)

	err := http.ListenAndServe(fmt.Sprintf("127.0.0.1:%d", port), Router)
	fmt.Println(err.Error())
}

func renderIndex(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	templates.ExecuteTemplate(w, "index.html", nil)
	// fmt.Fprint(w, "Welcome!\n")
}

/**
 *
	func OurLoggingHandler(h http.Handler) http.Handler {
	  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	    fmt.Println(*r.URL)
	    h.ServeHTTP(w, r)
	  })
	}

	func main() {
	    fileHandler := http.FileServer(http.Dir("/tmp"))
	    wrappedHandler := OurLoggingHandler(fileHandler)
	    http.ListenAndServe(":8080", wrappedHandler)
	}
*/
