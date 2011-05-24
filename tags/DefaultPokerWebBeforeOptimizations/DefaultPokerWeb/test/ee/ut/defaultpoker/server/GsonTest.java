package ee.ut.defaultpoker.server;

import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

public class GsonTest {
	private Gson gson;
	
	@Before
	public void setUp() {
		gson = new Gson();
	}
	
	@Test
	public void testIntSerialization() {
		int[] ints = {1, 2, 3, 4, 5};
		
		String expected = "[1,2,3,4,5]";
		
		String actual = gson.toJson(ints);
		
		assertTrue(expected.equals(actual));
	}
	
	@Test
	public void testStringSerialization() {
		String[] strings = {"abc", "def", "ghi"};
		
		String expected = "[\"abc\",\"def\",\"ghi\"]";
		
		String actual = gson.toJson(strings);
		
		assertTrue(expected.equals(actual));
	}
	
}
