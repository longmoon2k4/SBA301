package fu.se.lap05_longhvhe186065_be;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan({"fu.se.lap05_longhvhe186065_be.controllers", "fu.se.lap05_longhvhe186065_be.services", "fu.se.lap05_longhvhe186065_be.configs"})
@EnableJpaRepositories(basePackages = "fu.se.lap05_longhvhe186065_be.repositories")
@EntityScan(basePackages = "fu.se.lap05_longhvhe186065_be.pojos")
public class Lap05Longhvhe186065BeApplication {

    public static void main(String[] args) {
        SpringApplication.run(Lap05Longhvhe186065BeApplication.class, args);
    }

}
