package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type HandlerError struct {
	Error   error
	Message string
	Code    int
}

type JSON func(w http.ResponseWriter, r *http.Request) (interface{}, *HandlerError)

func (fn JSON) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	response, err := fn(w, r)

	if err != nil {
		log.Printf("ERROR: %v\n", err.Error)
		http.Error(w, fmt.Sprintf(`{"error":"%s"}`, err.Message), err.Code)
		return
	}
	if response == nil {
		log.Printf("ERROR: response from method is nil\n")
		http.Error(w, "Internal server error. check the logs.", http.StatusInternalServerError)
		return
	}
	// turn respoonse into json
	bytes, e := json.Marshal(response)
	if e != nil {
		http.Error(w, "Error harshalling JSON", http.StatusInternalServerError)
		return
	}

	// send response and log it
	w.Header().Set("Content-Type", "application/json")
	w.Write(bytes)
	log.Printf("%s %s %s %d", r.RemoteAddr, r.Method, r.URL, 200)

}
