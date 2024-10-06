package com.example.GatewayService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.cloud.gateway.filter.factory.GatewayFilterFactory;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.RouteMatcher;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;

@Component
@RefreshScope
public class CustomFilter extends AbstractGatewayFilterFactory {

    public CustomFilter() {
         super(Config.class);
    }

    RestTemplate restTemplate=new RestTemplate();
    @Override
    public GatewayFilter apply(Object config) {
        return (exchange,chain) -> {
        String token ="";
        ServerHttpRequest request = exchange.getRequest();
        if(issecure.test(exchange.getRequest())){
            if(!request.getHeaders().containsKey("Authorization")){
             return    onError(exchange,HttpStatus.UNAUTHORIZED);
            }else {
                token = request.getHeaders().get("Authorization").get(0);
                token = token.substring(7);

                Boolean forObject = restTemplate.getForObject("http://localhost:8080/user/validation?token=" + token, Boolean.class);
                if(!forObject){
                    return    onError(exchange,HttpStatus.UNAUTHORIZED);
                }
            }
        }

        return chain.filter(exchange);
      };
    }
    private Mono<Void> onError(ServerWebExchange exchange, HttpStatus httpStatus) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(httpStatus);
        return response.setComplete();
    }
    public static final List<String> URL_LIST= Arrays.asList("/user/registration","/user/login","/user/validation");
  Predicate<ServerHttpRequest> issecure= req-> URL_LIST.stream().noneMatch(uri->req.getURI().getPath().contains(uri));

    public static class Config{
    }
}
