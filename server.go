package main

import "fmt"
import "net/http"

func main() {
	fmt.Println("http://127.0.0.1:9999/[index.html]")
	http.ListenAndServe(":9999", http.FileServer(http.Dir(".")))
}
