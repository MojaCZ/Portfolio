package main

import (
	"net/http"
	"net/http/httputil"
	"net/url"
	"html/template"
	"log"
	// "fmt"
)

type Prox struct {
	target *url.URL
	proxy  *httputil.ReverseProxy
}

func New(target string) *Prox {
	url, _ := url.Parse(target)
	return &Prox{target: url, proxy: httputil.NewSingleHostReverseProxy(url)}
}

func (p *Prox) handle(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("X-GoProxy", "GoProxy")
	p.proxy.ServeHTTP(w, req)
}

var tpl *template.Template

func init() {
	tpl = template.Must(template.ParseFiles("./index.gohtml"))
}

func main() {
	addrVocab := "http://localhost:8081"
	addrSongs := "http://localhost:8082"
	addrClimbing := "http://localhost:8083"
	addrTravel := "http://localhost:8084"
	addrCode := "http://localhost:8085"
	// addrStromky := "http://localhost:8086"

	// proxy := &Prox{}
	proxyVocab := New(addrVocab)
	proxySongs := New(addrSongs)
	proxyTravel := New(addrTravel)
	proxyClimbing := New(addrClimbing)
	proxyCode := New(addrCode)
	// proxyStromky := New(addrStromky)
	// proxy.New(*url)

	// http.HandleFunc("/", proxy.handle)
	http.Handle("/files/", http.StripPrefix("/files", http.FileServer(http.Dir("./files"))))
	http.HandleFunc("/", index)
	http.HandleFunc("/Vocabulary/", proxyVocab.handle)
	http.HandleFunc("/SongsBook/", proxySongs.handle)
	http.HandleFunc("/Travel/", proxyTravel.handle)
	http.HandleFunc("/Climbing/", proxyClimbing.handle)
	http.HandleFunc("/Code/", proxyCode.handle)
	// http.HandleFunc("/Stromky/", proxyStromky.handle)
	if err := http.ListenAndServe(":80", nil); err != nil {
		log.Fatalln(err)
	}
}

func index(w http.ResponseWriter, req *http.Request) {
	tpl.ExecuteTemplate(w, "index.gohtml", nil)
}

func imagesServe(w http.ResponseWriter, req *http.Request) {
}
