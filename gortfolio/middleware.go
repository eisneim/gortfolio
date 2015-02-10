package gortfolio

import (
	"net/http"
)

// ---------------------------------------------------------
type AppendMiddleware struct {
	handler http.Handler
}

func (a *AppendMiddleware) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	a.handler.ServeHTTP(w, r)
	w.Write([]byte("<!-- Middleware says hello! -->"))
}

// ---------------------------------------------------------
