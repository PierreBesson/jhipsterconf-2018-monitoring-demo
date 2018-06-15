package com.mycompany.myapp.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient("catalog")
public interface CatalogClient {
    @RequestMapping(path = "/api/tours/demo/triggerError", method = RequestMethod.GET)
    public String triggerError();

    @RequestMapping(path = "/api/tours/demo/createRandom", method = RequestMethod.POST)
    public String createRandom();

}
