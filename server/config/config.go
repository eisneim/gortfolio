package config

import (
	"encoding/json"
	"fmt"
	// "html/template"
	// "io/ioutil"
	"log"
	"os"
	// "path/filepath"
	"runtime"
)

type ConfigStruct struct {
	Host                       string `json:"host"`
	Port                       int    `json:"port"`
	DB                         string `json:"db"`
	GithubClientId             string `json:"github_auth_client_id"`
	GithubClientSecret         string `json:"github_auth_client_secret"`
	GithubLoginRedirect        string `json:"github_login_redirect"`
	GithubLoginSuccessRedirect string `json:"github_login_success_redirect"`
	GoVersion                  string
	RootPath                   string
}

var Config ConfigStruct

func Register() ConfigStruct {
	// get he root path  of our application
	rootDir, err := os.Getwd() //filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(rootDir)

	file, err := os.Open(rootDir + "/app_config.json")
	if err != nil {
		log.Fatal("配置文件读取失败:", err.Error())
	}
	defer file.Close()

	dec := json.NewDecoder(file)
	err = dec.Decode(&Config)
	if err != nil {
		log.Fatal("配置文件解析失败: ", err.Error())
	}

	Config.GoVersion = runtime.Version()
	Config.RootPath = rootDir

	return Config
}

func GetConfig() ConfigStruct {
	if Config.GoVersion != "" {
		return Config
	} else {
		return Register()
	}
}
