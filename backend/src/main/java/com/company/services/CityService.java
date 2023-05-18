package com.company.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.company.entities.City;
import com.company.helpers.CSVHelper;
import com.company.repositories.CityRepository;

@Service
public class CityService {
	
	private static final Logger logger = LoggerFactory.getLogger(CityService.class);
	
	@Autowired
	private CityRepository cityRepository;
	
	public void saveIntialData() {
		if(!cityRepository.existsById(1L)) {
			 try {
				 File initialFile = new File("src/main/resources/cities.csv");
				  InputStream targetStream = new FileInputStream(initialFile);
			      List<City> tutorials = CSVHelper.csvToCities(targetStream);
			      cityRepository.saveAll(tutorials);
			    } catch (IOException e) {
			      logger.error("fail to store csv data: " + e.getMessage());
			      throw new RuntimeException("fail to store csv data: " + e.getMessage());
			    }	
		} else {
			logger.info("Initial Data Already Dumped");
		}
	}
	
	public Page<City> getAllPagableCities(Pageable pageable) {
		return cityRepository.findAll(pageable);
	}
	
	public Optional<City> getCityById(Long id) {
		return cityRepository.findById(id);
	}
	
	public Page<City> getAllPagableCitiesByName(String name, Pageable pageable) {
		return cityRepository.findByNameContainingIgnoreCase(name, pageable);
	}
	
	public Optional<City> updateCity(City city) {
		if(city == null) {
			return Optional.empty();
		}
		Optional<City> cityDbObjOp =	cityRepository.findById(city.getId());
		if(cityDbObjOp.isPresent()) {
			City cityLocal = cityDbObjOp.get();
			cityLocal.setName(city.getName());
			cityLocal.setPhoto(city.getPhoto());
			return Optional.of(cityRepository.save(cityLocal));
		}
		return Optional.empty();
	}

}
