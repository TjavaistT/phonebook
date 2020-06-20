package com.phonebook.web;

import com.TestUtil;
import org.springframework.test.web.servlet.ResultMatcher;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class TestMatcher<T> {
    private final Class<T> clazz;
    private final String[] fieldsToIgnore;

    private TestMatcher(Class<T> clazz, String... fieldsToIgnore) {
        this.clazz = clazz;
        this.fieldsToIgnore = fieldsToIgnore;
    }

    public static <T> TestMatcher<T> usingFieldsComparator(Class<T> clazz, String... fieldsToIgnore) {
        return new TestMatcher<>(clazz, fieldsToIgnore);
    }

    public void assertMatch(T actual, T expected) {
        assertThat(actual).isEqualToIgnoringGivenFields(expected, fieldsToIgnore);
    }

    public void assertMatch(Iterable<T> actual, Iterable<T> expected) {
        assertThat(actual).usingElementComparatorIgnoringFields(fieldsToIgnore).isEqualTo(expected);
    }

    public ResultMatcher contentJson(T expected) {
        return result -> assertMatch(TestUtil.readFromJsonMvcResult(result, clazz), expected);
    }

    public ResultMatcher contentJson(T... expected) {
        return contentJson(new ArrayList(Arrays.asList(expected)));
    }

    public ResultMatcher contentJson(Iterable<T> expected) {
        return result -> assertMatch(TestUtil.readListFromJsonMvcResult(result, clazz), expected);
    }
}
