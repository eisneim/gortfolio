package gortfolio

import (
	"encoding/json"
	// "fmt"
	"log"
	"net/http"
	"net/http/httptest"
)

func JSON_md(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		rec := httptest.NewRecorder()
		// passing a ResponseRecorder instead of the original RW
		h.ServeHTTP(rec, r)
		// after this finishes, we have the response recorded
		// and can modify it before copying it to the original RW

		// we copy the original headers first
		for k, v := range rec.Header() {
			w.Header()[k] = v
		}

		if rec.Body == nil {
			log.Printf("ERROR: response from method is nil\n")
			http.Error(w, "Internal server error. check the logs.", http.StatusInternalServerError)
			return
		}

		// turn respoonse into json
		bytes, e := json.Marshal(rec.Body.String())
		if e != nil {
			http.Error(w, "Error harshalling JSON", http.StatusInternalServerError)
			return
		}

		// send response and log it
		w.Header().Set("Content-Type", "application/json")

		// finally, write out our data
		w.Write(bytes)
		// then write out the original body
		// w.Write( rec.Body.Bytes() )

		log.Printf("%s %s %s %d", r.RemoteAddr, r.Method, r.URL, 200)
	})
}

// ---------------------------------------------------------
