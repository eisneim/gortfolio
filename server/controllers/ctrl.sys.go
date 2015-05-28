package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	// "github.com/eisneim/gortfolio/server/config"
)

/**
 * return the install form
 * @param {[type]} c *gin.Context [description]
 */
func Sys_getInstall(c *gin.Context) {
	c.HTML(http.StatusOK, "install.html", nil)
}

func Sys_install(c *gin.Context) {
	c.String(http.StatusOK, "should do the installation ==> ")
}
