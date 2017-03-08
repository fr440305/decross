package main

import "fmt"
import "net/http"

func main() {
	fmt.Println("vim-go")
	http.ListenAndServe(":9999", http.FileServer(http.Dir(".")))
}
