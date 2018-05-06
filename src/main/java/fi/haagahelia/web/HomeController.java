package fi.haagahelia.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import fi.haagahelia.domain.Student;
import fi.haagahelia.domain.StudentRepository;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
@Controller
public class HomeController {

    @Autowired
    private StudentRepository repository;
    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }
                //restfull haku listaan
    @RequestMapping(value="/studentlist", method = RequestMethod.GET)
    public @ResponseBody
    List<Student> studentListRest() {
        return (List<Student>) repository.findAll();
    }
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
    public String deleteStudent(@PathVariable("id") Long id, Model model) {
        repository.delete(id);
        return "redirect:../";
    }
}
