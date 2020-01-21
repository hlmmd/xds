//g++ -o test studentsql.cpp -std=c++11
#include <string>
#include <sstream>
#include<vector>
#include <fstream>
#include <iostream>
#include <random>
using namespace std;

const int student_size = 100;

int main()
{
	default_random_engine e;
	fstream fin;
	vector<string> province;
	fin.open("province.txt");

	while (fin)
	{
		string temp;
		fin>> temp;
		cout<<"\'"<<temp<<"\',";
		if(temp!="")
		province.push_back(temp);
	}

	// province option
	// for(int i= 0 ;i<province.size();i++)
	// {
	// 	ostringstream ostr1;
	// 	ostr1 <<"<option value=\"";
	// 	ostr1<<i<<"\">"<<province[i]<<"</option>\"";
	// 	cout<<ostr1.str()<<endl;
	// }
	
	//sql
	for(int i= 0 ;i<student_size;i++)
	{
		
		int year = e()%5+2015;
		int province_id = e()%34;
		ostringstream ostr1;
		ostr1<< "INSERT INTO xds_student (name,student_id,year, province_id) VALUES( \'";
		ostr1<<"xx"<<i<<"\',\'"<<i<<"\',\'";
		ostr1<<year<<"\',\'"<<province_id<<"\');";
		cout<<ostr1.str()<<endl;
	}





	return 0;
}





