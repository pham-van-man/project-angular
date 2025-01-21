package org.example.learnengbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageRequestDto {
    private String q = "";
    private int page = 0;
    private int size = 5;
    private String sort = "id";
    private String sortDir = "asc";
}
