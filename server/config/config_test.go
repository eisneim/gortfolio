package config

import (
	"testing"
)

func TestConfigVars(t *testing.T) {
	config := GetConfig()
	if config.Host != "localhost" {
		t.Errorf("shold read app_config.json file")
	}

	if Config.Port != 8888 {
		t.Errorf("should readConf directly %s", "!")
	}

}
