package org.example.learnengbackend.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.example.learnengbackend.model.User;
import org.example.learnengbackend.model.Word;
import org.example.learnengbackend.service.user.UserService;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AuditAspect {
    private final UserService userService;

    public AuditAspect(UserService userService) {
        this.userService = userService;
    }

    @Before("execution(* org.example.learnengbackend.service.word.WordServiceImpl.save(..))")
    public void setCreatedByAndUpdatedByBefore(JoinPoint joinPoint) {
        Object entity = joinPoint.getArgs()[0];
        Word word = (Word) entity;
        User currentUser = userService.getCurrentUser();
        if (word.getCreatedBy() == null) {
            word.setCreatedBy(currentUser);
        }
        word.setUpdatedBy(currentUser);
    }
}