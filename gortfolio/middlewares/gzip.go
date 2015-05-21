package middlewares

import (
	"compress/gzip"
	"net/http"
	"strings"
)

/**
 * this one is just for "return" type
 * interface just make it possible to switch type onec two type have same "method"s
 *
 */
type CloseableResponseWriter interface {
	http.ResponseWriter
	Close()
}

// ----------------------------------------
type gzipResponseWriter struct {
	http.ResponseWriter
	*gzip.Writer
}

func (this gzipResponseWriter) Write(data []byte) (int, error) {
	return this.Writer.Write(data)
}

func (this gzipResponseWriter) Close() {
	this.Writer.Close()
}

func (this gzipResponseWriter) Header() http.Header {
	return this.ResponseWriter.Header()
}

// ----------------------------------------
type closeableResponseWriter struct {
	http.ResponseWriter
}

func (this closeableResponseWriter) Close() {

}

func GetResponseWriter(w http.ResponseWriter, req *http.Request) CloseableResponseWriter {
	if strings.Contains(req.Header.Get("Accept-Encoding"), "gzip") {
		w.Header().Set("Content-Encoding", "gzip")

		gRW := gzipResponseWriter{
			ResponseWriter: w,
			Writer:         gzip.NewWriter(w),
		}

		return gRW
	} else {
		return closeableResponseWriter{ResponseWriter: w}
	}

}
