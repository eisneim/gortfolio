package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/unrolled/render"
	"log"
	"net/http"
)

/**
r := render.New(render.Options{
    Directory: "templates", // Specify what path to load the templates from.
    Layout: "layout", // Specify a layout template. Layouts can call {{ yield }} to render the current template.
    Extensions: []string{".tmpl", ".html"}, // Specify extensions to load for templates.
    Funcs: []template.FuncMap{AppHelpers}, // Specify helper function maps for templates to access.
    Delims: render.Delims{"{[{", "}]}"}, // Sets delimiters to the specified strings.
    Charset: "UTF-8", // Sets encoding for json and html content-types. Default is "UTF-8".
    IndentJSON: true, // Output human readable JSON.
    IndentXML: true, // Output human readable XML.
    PrefixJSON: []byte(")]}',\n"), // Prefixes JSON responses with the given bytes.
    PrefixXML: []byte("<?xml version='1.0' encoding='UTF-8'?>"), // Prefixes XML responses with the given bytes.
    HTMLContentType: "application/xhtml+xml", // Output XHTML content type instead of default "text/html".
    IsDevelopment: true, // Render will now recompile the templates on every HTML response.
})
*/
var (
	R = render.New(render.Options{
		IndentJSON:    false,
		Directory:     "../views",
		IsDevelopment: true,
	})
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
