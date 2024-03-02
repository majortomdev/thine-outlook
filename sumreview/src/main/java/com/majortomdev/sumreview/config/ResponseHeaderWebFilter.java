//package com.majortomdev.sumreview.config;
//
//import org.springframework.lang.NonNull;
//import org.springframework.stereotype.Component;
//import org.springframework.web.server.ServerWebExchange;
//import org.springframework.web.server.WebFilter;
//import org.springframework.web.server.WebFilterChain;
//
//import reactor.core.publisher.Mono;
//
//@Component
//public class ResponseHeaderWebFilter implements WebFilter {
//
//    @SuppressWarnings("unchecked")
//	@Override
//    public Mono filter(@NonNull ServerWebExchange exchange, @NonNull WebFilterChain chain) {
//        exchange.getResponse().getHeaders().add("Access-Control-Allow-Origin", "*");
//        System.out.println("yoyoyoyoyooo boooyyyyy");
//        return chain.filter(exchange);
//    }
//}