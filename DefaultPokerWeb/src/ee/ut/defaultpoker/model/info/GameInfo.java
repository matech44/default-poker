package ee.ut.defaultpoker.model.info;

import java.util.ArrayList;
import java.util.List;

public class GameInfo {
	private String type;
	private List<String> data;
	private String session;
	
	public GameInfo(String type) {
		data = new ArrayList<String>();
		this.type = type;
	}
	
	public void setData(List<String> data) {
		this.data = data;
	}
	
	public void setSession(String session) {
		this.session = session;
	}
	
	public List<String> getData() {
		return data;
	}
	
	public String getSession() {
		return session;
	}
	
	public void addData(String newData) {
		data.add(newData);
	}
}
