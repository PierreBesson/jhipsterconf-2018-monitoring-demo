package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.client.CatalogClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * DemoResource.
 *
 * @author Pierre Besson
 */
@RestController
@RequestMapping("/api/")
public class DemoResource {
    private final Logger log = LoggerFactory.getLogger(DemoResource.class);

    private final CatalogClient catalogClient;

    public DemoResource(CatalogClient catalogClient) {
        this.catalogClient = catalogClient;
    }

    /**
     * GET  /routes : get the active routes.
     *
     * @return the ResponseEntity with status 200 (OK) and with body the list of routes
     */
    @GetMapping("/demo/testCreateRandom")
    @Timed
    public String testCreateRandom() {
        log.info("Do a request to catalog to create a random Tour");

        return catalogClient.createRandom();
    }

    /**
     * GET  /routes : get the active routes.
     *
     * @return the ResponseEntity with status 200 (OK) and with body the list of routes
     */
    @GetMapping("/demo/testError")
    @Timed
    public String testError() {
        return catalogClient.triggerError();
    }
}
