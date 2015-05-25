package main

import (
	"fmt"
	"reflect"
)

type somestring struct {
	Host string
}

func main() {
	var aa somestring

	fmt.Println(reflect.TypeOf(a))

	if aa.Host == "" {
		fmt.Println("it is empty ")
	} else {
		fmt.Println("it is not empty")
	}

}
