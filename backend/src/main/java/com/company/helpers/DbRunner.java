package com.company.helpers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.company.services.CityService;
import com.company.services.DumpDataService;

@Component
public class DbRunner implements CommandLineRunner{
	
	private static final Logger logger = LoggerFactory.getLogger(DbRunner.class);
	
	@Autowired
	private CityService cityService;
	
	@Autowired
	private DumpDataService dumpDataService;
	
	@Override
    public void run(String...args) throws Exception {
		logger.info("Called Intial Data");
		cityService.saveIntialData();
		logger.info("Saved Intial Data");
		dumpDataService.dumpInitialUserData();
		logger.info("Saved Intial User Data");
	
	}

}
