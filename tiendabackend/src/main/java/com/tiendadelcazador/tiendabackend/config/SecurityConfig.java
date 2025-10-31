// En: config/SecurityConfig.java
package com.tiendadelcazador.tiendabackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer; // <-- ¡NUEVO IMPORT!
import org.springframework.security.config.http.SessionCreationPolicy; // <-- ¡NUEVO IMPORT!
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationProvider authProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                // 1. Configuración de CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                
                // 2. FORMA "NUCLEAR" DE DESHABILITAR CSRF (más moderna y explícita)
                .csrf(AbstractHttpConfigurer::disable) 
                
                // 3. Autorización de Rutas (ORDEN CAMBIADO PARA SER EXPLÍCITO)
                .authorizeHttpRequests(auth -> auth
                        
                        // --- RUTAS PÚBLICAS (¡LO MÁS IMPORTANTE PRIMERO!) ---
                        
                        // Permite TODAS las peticiones OPTIONS (para el "pre-vuelo" de CORS)
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() 
                        
                        // ¡Permite el REGISTRO explícitamente!
                        .requestMatchers("/api/auth/registro").permitAll() 
                        .requestMatchers("/api/auth/login").permitAll()
                        .requestMatchers("/api/auth/perfil").permitAll() // (Devolverá 401 si no hay sesión, está bien)
                        
                        .requestMatchers(HttpMethod.GET, "/api/productos/**").permitAll() 
                        .requestMatchers(HttpMethod.GET, "/api/categorias/**").permitAll()
                        .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        
                        // --- RUTAS DE ADMIN ---
                        .requestMatchers("/api/admin/**").hasAuthority("ADMIN") 
                        
                        // --- EL RESTO ---
                        .anyRequest().authenticated()
                )
                
                // 4. Política de Sesión (para ser explícitos de que SÍ usamos sesiones)
                .sessionManagement(session -> 
                    session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                )
                
                .logout(logout -> logout
                    .logoutUrl("/api/auth/logout") 
                    .logoutSuccessHandler((req, res, auth) -> res.setStatus(200))
                    .deleteCookies("JSESSIONID")
                    .invalidateHttpSession(true)
                )
                
                .authenticationProvider(authProvider)
                .build();
    }

    // --- BEAN DE CONFIGURACIÓN DE CORS (Sin cambios) ---
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
    configuration.setAllowCredentials(true); 

    // --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(); 
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
}
