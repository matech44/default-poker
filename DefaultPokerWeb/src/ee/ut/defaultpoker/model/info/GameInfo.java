package ee.ut.defaultpoker.model.info;

import java.util.ArrayList;
import java.util.List;

public class GameInfo {
	private String type;
	private List<String> data;
	private int id;
	private String session;
	
	public GameInfo(String type) {
		data = new ArrayList<String>();
		this.type = type;
	}
	
	public List<String> getData() {
		return data;
	}
	
	public void setData(List<String> data) {
		this.data = data;
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getSession() {
		return session;
	}
	
	public void setSession(String session) {
		this.session = session;
	}
	
	public void addData(String newData) {
		data.add(newData);
	}
}
