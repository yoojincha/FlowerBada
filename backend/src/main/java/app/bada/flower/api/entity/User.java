package app.bada.flower.api.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class User extends BaseEntity{
    @Column(nullable = false, length=256)
    private String token;

    @Column(columnDefinition = "INT DEFAULT 0")
    private int points;

    @OneToMany(mappedBy = "user")
    private List<FlowerUser> flowerUsers = new ArrayList<>();
}