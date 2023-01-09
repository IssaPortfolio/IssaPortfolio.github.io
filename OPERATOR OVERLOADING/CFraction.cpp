#include "CFraction.h"
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

// Greatest common divisor
int CFraction::gcd(int x, int y) {
	// base case
	if (y == 0)
		return x;
	else
		return gcd(y, x % y);
}

// Simplify fractions
void CFraction::simplify() {
	int value = gcd(numerator, denominator);
	if (value != 0) {
		numerator /= value;
		denominator /= value;
	}
}

// Fraction operation
CFraction CFraction::operator + (const CFraction& Obj) const {
	CFraction resultant;
	resultant.numerator = (numerator * Obj.denominator) + (Obj.numerator * denominator);
	resultant.denominator = denominator * Obj.denominator;
	resultant.simplify();
	return resultant;
}
CFraction CFraction::operator - (const CFraction& Obj) const {
	CFraction resultant;
	resultant.numerator = (numerator * Obj.denominator) - (Obj.numerator * denominator);
	resultant.denominator = denominator * Obj.denominator;
	resultant.simplify();
	return resultant;
}
CFraction CFraction::operator * (const CFraction& Obj) const {
	CFraction resultant;
	resultant.numerator = numerator * Obj.numerator;
	resultant.denominator = denominator * Obj.denominator;
	resultant.simplify();
	return resultant;
}
CFraction CFraction::operator / (const CFraction& Obj) const {
	CFraction resultant;
	resultant.numerator = numerator * Obj.denominator;
	resultant.denominator = denominator * Obj.numerator;
	resultant.simplify();
	return resultant;
}

// Float or double operation
CFraction CFraction::operator+(double value) const {
	int whole_number = static_cast<int>(value / 1);
	double decimal = value - whole_number;

	// Converts double data type to string
	string decimal_To_String(to_string(decimal));
	// Using the double to string conversion, we read until we fnd last not of string 0 to determine decimal places.
	int decimal_places = static_cast<int>(decimal_To_String.find_last_not_of("0"));

	int numerator;
	int denominator;

	if (decimal_places == 3) {
		whole_number *= 100;
		decimal *= 100;
		numerator = static_cast<int>(whole_number + decimal);
		denominator = 100;
	}
	else {
		whole_number *= 10;
		decimal *= 10;
		numerator = static_cast<int>(whole_number + decimal);
		denominator = 10;
	}

	CFraction double_fract(numerator, denominator);
	CFraction resultant;
	// *this is the object that is being operated with a float
	resultant = *this + double_fract;
	return resultant;
}

CFraction CFraction::operator - (double value) const {
	int whole_number = static_cast<int>(value / 1);
	double decimal = value - whole_number;

	string decimal_To_String(to_string(decimal));
	int decimal_places = static_cast<int>(decimal_To_String.find_last_not_of("0"));

	int numerator;
	int denominator;

	if (decimal_places == 3) {
		whole_number *= 100;
		decimal *= 100;
		numerator = static_cast<int>(whole_number + decimal);
		denominator = 100;
	}
	else {
		whole_number *= 10;
		decimal *= 10;
		numerator = static_cast<int>(whole_number + decimal);
		denominator = 10;
	}

	CFraction double_fract(numerator, denominator);
	CFraction resultant;
	resultant = *this - double_fract;
	return resultant;
}
CFraction CFraction::operator * (double value) const {
	int whole_number = static_cast<int>(value / 1);
	double decimal = value - whole_number;

	string decimal_To_String(to_string(decimal));
	int decimal_places = static_cast<int>(decimal_To_String.find_last_not_of("0"));

	int numerator;
	int denominator;

	if (decimal_places == 3) {
		whole_number *= 100;
		decimal *= 100;
		numerator = static_cast<int>(whole_number + decimal);
		denominator = 100;
	}
	else {
		whole_number *= 10;
		decimal *= 10;
		numerator = static_cast<int>(whole_number + decimal);
		denominator = 10;
	}

	CFraction double_fract(numerator, denominator);
	CFraction resultant;
	resultant = *this * double_fract;
	return resultant;
}
CFraction CFraction::operator / (double value) const {
	int whole_number = static_cast<int>(value / 1);
	double decimal = value - whole_number;

	string decimal_To_String(to_string(decimal));
	int decimal_places = static_cast<int>(decimal_To_String.find_last_not_of("0"));

	int numerator;
	int denominator;

	if (decimal_places == 3) {
		whole_number *= 100;
		decimal *= 100;
		numerator = static_cast<int>(whole_number + decimal);
		denominator = 100;
	}
	else {
		whole_number *= 10;
		decimal *= 10;
		numerator = static_cast<int>(whole_number + decimal);
		denominator = 10;
	}

	CFraction double_fract(numerator, denominator);
	CFraction resultant;
	resultant = *this / double_fract;
	return resultant;
}

// Comparison operators
bool CFraction::operator == (const CFraction& Obj) const {
	return numerator * Obj.denominator == Obj.numerator * denominator;
}
bool CFraction::operator > (const CFraction& Obj) const {
	return numerator * Obj.denominator > Obj.numerator* denominator;
}
bool CFraction::operator < (const CFraction& Obj) const {
	return numerator * Obj.denominator < Obj.numerator* denominator;
}

// Stream operators
istream& operator >> (istream& CIN, CFraction& Obj) {
	cout << "Enter numerator: ";
	cin >> Obj.numerator;
	cout << "Enter denominator: ";
	cin >> Obj.denominator;
	return CIN;
}
ostream& operator << (ostream& COUT, const CFraction& Obj) {

	COUT << Obj.numerator << "/" << Obj.denominator;
	return COUT;
}

// Initilize and returns value of count
int CFraction::count = 0;
int CFraction::getcount() {
	return count;
}

// Converts improper fractions to mixed fractions
void CFraction::improperToMixed(const CFraction& Obj, ofstream & OutputStream) const {

	int new_numerator = Obj.numerator;
	int whole_number = 0;

	// Convert fraction improper to mixed fraction
	for (int dividend = Obj.numerator - 1; dividend > 1; dividend--) {
		if ((dividend % Obj.denominator) == 0) {
			new_numerator = Obj.numerator - dividend;
			whole_number = dividend / Obj.denominator;
			break;
		}
	}
	// 1 2/0 = Undefined
	if (Obj.denominator == 0) {
		OutputStream << "Undefined";
		cout << "Undefined";
	}
	// Prints whole number if not 0
	if (whole_number != 0) {
		OutputStream << whole_number << " ";
		cout << whole_number << " ";
	}
	// 1 0/2 = 0
	if (new_numerator == 0) {
		OutputStream << 0;
		cout << 0;
	}
	// 1 2/1 = 2
	if (Obj.denominator == 1 && new_numerator != 0) {
		OutputStream << new_numerator;
		cout << new_numerator;
	}
	if (Obj.denominator != 1 && Obj.denominator != 0) {
		OutputStream << new_numerator << "/" << Obj.denominator;
		cout << new_numerator << "/" << Obj.denominator;
	}
}

// Constructor
CFraction::CFraction(int given_numerator, int given_denominator) {
	numerator = given_numerator;
	if (given_denominator == 0)
		denominator = 1;
	else
		denominator = given_denominator;
	count++;
}