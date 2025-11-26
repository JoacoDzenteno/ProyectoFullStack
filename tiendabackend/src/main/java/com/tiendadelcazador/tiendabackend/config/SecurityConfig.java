// En: src/main/java/com/tiendadelcazador/tiendabackend/config/SecurityConfig.java
package com.tiendadelcazador.tiendabackend.config;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable())
      .cors(Customizer.withDefaults())
      .authorizeHttpRequests(auth -> auth
        .requestMatchers(
          "/swagger-ui.html",
          "/swagger-ui/**",
          "/v3/api-docs/**",
          "/v3/api-docs.yaml"
        ).permitAll()

        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
        .requestMatchers("/images/**").permitAll()

        .requestMatchers("/api/auth/**").permitAll()
        .requestMatchers(HttpMethod.POST, "/api/auth/registro").permitAll()
        .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
        .requestMatchers(HttpMethod.GET,  "/api/auth/perfil").permitAll()
        .requestMatchers(HttpMethod.POST, "/api/auth/logout").permitAll()

        .requestMatchers("/api/productos/**", "/api/categorias/**").permitAll()

        .requestMatchers(HttpMethod.GET,    "/api/usuarios/**").hasRole("ADMIN")
        .requestMatchers(HttpMethod.POST,   "/api/usuarios/**").hasRole("ADMIN")
        .requestMatchers(HttpMethod.PUT,    "/api/usuarios/**").hasRole("ADMIN")
        .requestMatchers(HttpMethod.PATCH,  "/api/usuarios/**").hasRole("ADMIN")
        .requestMatchers(HttpMethod.DELETE, "/api/usuarios/**").hasRole("ADMIN")
        .requestMatchers("/api/admin/**").hasRole("ADMIN")
        .anyRequest().authenticated()
      )
      .formLogin(form -> form.disable())
      .httpBasic(basic -> basic.disable());

    return http.build();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration cfg = new CorsConfiguration();
    cfg.setAllowedOrigins(List.of("http://localhost:5173"));
    cfg.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
    cfg.setAllowedHeaders(List.of("Content-Type","Authorization","X-Requested-With","X-XSRF-TOKEN"));
    cfg.setAllowCredentials(true);
    cfg.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", cfg);
    return source;
  }
}
