package gortfolio

import (
	"fmt"
	// "io/ioutil"
	"github.com/justinas/alice"
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

func LoggingMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("request started")
		// h(w, r)
		// log.Println("request finished")
		h.ServeHTTP(w, r)
		// append some thing here;
		w.Write([]byte("___md"))
		log.Println("request finished")
	})
}

func Serve(port int, dir string) {

	// Router.Handle("/", http.RedirectHandler("/static/", 302))
	Router.GET("/", renderIndex)

	// static files
	Router.NotFound = http.FileServer(http.Dir(dir)).ServeHTTP

	log.Printf("Running on port %d\n", port)

	middlewareChain := alice.New(JSON_md).Then(Router)

	err := http.ListenAndServe(fmt.Sprintf("127.0.0.1:%d", port), middlewareChain)
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
