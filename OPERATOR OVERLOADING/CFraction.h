#pragma once
#include <iostream>
#include <fstream>
using namespace std;

class CFraction {
private:
	int numerator;
	int denominator;
	static int count;
	void simplify();

public:
	// Greatest common divisor
	int gcd(int, int);

	// Example: 2/4 + 4/2
	CFraction operator + (const CFraction&) const;
	CFraction operator - (const CFraction&) const;
	CFraction operator * (const CFraction&) const;
	CFraction operator / (const CFraction&) const;

	// Example: 2/4 + 2.5
	CFraction operator + (double) const;
	CFraction operator - (double) const;
	CFraction operator * (double) const;
	CFraction operator / (double) const;

	// Comparison operators
	bool operator == (const CFraction&) const;
	bool operator > (const CFraction&) const;
	bool operator < (const CFraction&) const;

	// Stream operators
	friend istream& operator >> (istream&, CFraction&);
	friend ostream& operator << (ostream&, const CFraction&);

	// Counts object(s) created
	int getcount();

	// Converts improper fractions to mixed fractions
	void improperToMixed(const CFraction&, ofstream&) const;

	// Constructor with default values
	CFraction(int = 0, int = 1);
};