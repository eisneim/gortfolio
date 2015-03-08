package gortfolio

import (
	"fmt"
	// "io/ioutil"
	"github.com/justinas/alice"
	"html/template"
	"log"
	"net/http"
	// "strconv"
	// "gopkg.in/mgo.v2"
	// "gopkg.in/mgo.v2/bson"

	// router
	"github.com/julienschmidt/httprouter"
	// "github.com/eisneim/gortfolio/gortfolio/controllers"
)

var (
	templates *template.Template
	Router    = httprouter.New()
)

func init() {
	// teplate cache
	templates = template.Must(
		template.ParseFiles("./gortfolio/views/index.html"),
	)
}

/*
	------- for testing, useless ------
*/
func LoggingMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("request started")
		w.Write([]byte("md___"))
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
	// Router.GET("/", renderIndex)

	// static files
	Router.NotFound = http.FileServer(http.Dir(dir)).ServeHTTP

	log.Printf("Running on port %d\n", port)

	middlewareChain := alice.New().Then(Router)

	err := http.ListenAndServe(fmt.Sprintf("127.0.0.1:%d", port), middlewareChain)
	fmt.Println(err.Error())
}

func renderIndex(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	templates.ExecuteTemplate(w, "index.html", nil)
	// fmt.Fprint(w, "Welcome!\n")
}

/**
 * -------------------------- main middleware-------------
 * 1. mongodb connection
 * 2. logging
 * 3. error handling
 */
//  type Ghandler struct {
// 	ResponseWriter http.ResponseWriter
// 	Request        *http.Request
// 	StartTime      time.Time
// 	Session        *mgo.Session
// 	DB             *mgo.Database
// }

// func NewHandler(w http.ResponseWriter, r *http.Request) Ghandler {
// 	session, err := mgo.Dial(Config.DB)
// 	if err != nil {
// 		panic(err)
// 	}

// 	session.SetMode(mgo.Monotonic, true)

// 	return Ghandler{
// 		ResponseWriter: w,
// 		Request:        r,
// 		StartTime:      time.Now(),
// 		Session:        session,
// 		DB:             session.DB("gopher"),
// 	}
// }

//  func handlerFun(route Route) http.HandlerFunc {
// 	return func(w http.ResponseWriter, r *http.Request) {
// 		/*
// 			defer func() {
// 				if e := recover(); e != nil {
// 					fmt.Println("panic:", e)
// 				}
// 			}()*/
// 		handler := NewHandler(w, r)
// 		defer handler.Session.Close()

// 		url := r.Method + " " + r.URL.Path
// 		if r.URL.RawQuery != "" {
// 			url += "?" + r.URL.RawQuery
// 		}
// 		fmt.Println(time.Now().Format("2006-01-02 15:04:05"), url)
// 		if route.Permission == Everyone {
// 			route.HandlerFunc(handler)
// 		} else if route.Permission == Authenticated {
// 			_, ok := currentUser(handler)

// 			if !ok {
// 				http.Redirect(w, r, "/signin", http.StatusFound)
// 				return
// 			}

// 			route.HandlerFunc(handler)
// 		} else if route.Permission == Administrator {
// 			user, ok := currentUser(handler)

// 			if !ok {
// 				http.Redirect(w, r, "/signin", http.StatusFound)
// 				return
// 			}

// 			if !user.IsSuperuser {
// 				message(handler, "没有权限", "对不起，你没有权限进行该操作", "error")
// 				return
// 			}

// 			route.HandlerFunc(handler)
// 		}
// 	}
// }
