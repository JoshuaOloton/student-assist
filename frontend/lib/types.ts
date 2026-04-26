export interface StudentSearchData {
  matricnum: string;
  department: string;
  level: string;
}

export interface StudentInfo {
  id: string
  matricnum: string
  surname: string
  firstname: string
  email: string
  department: string
  level: string
  enrollment_date: string
  status: string
}

export interface Message {
  id: string;
  content: string;
  role: "user" | "ai";
  timestamp: Date;
}