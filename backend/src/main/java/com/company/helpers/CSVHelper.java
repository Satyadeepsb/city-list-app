package com.company.helpers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.company.entities.City;

public class CSVHelper {
	
	private static final Logger logger = LoggerFactory.getLogger(CSVHelper.class);
	
	public static List<City> csvToCities(InputStream is) {
	    try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
	        CSVParser csvParser = new CSVParser(fileReader,
	            CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {

	      Iterable<CSVRecord> csvRecords = csvParser.getRecords();
	      
	      return  StreamSupport
	    		  .stream(csvRecords.spliterator(), false)
	    		  .map((csvRecord) -> {
			    	  return new City(
				              Long.parseLong(csvRecord.get("id")),
				              csvRecord.get("name"),
				              csvRecord.get("photo")
				            );
	    		  })
	    		  .collect(Collectors.toList());

	    } catch (IOException e) {
	      logger.error("fail to parse CSV file: " + e.getMessage());
	      throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
	    }
	  }

}
