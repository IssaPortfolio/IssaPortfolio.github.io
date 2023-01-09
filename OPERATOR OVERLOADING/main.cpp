#include <iostream>
#include <fstream>
#include "CFraction.h"
#include <string>

using namespace std;

// Reads from file and calculates operations
bool readFracsFromFile(const string INPUT_FILE_NAME, ofstream & OutputStream) {

    // Object
    ifstream InputStream;
    InputStream.open(INPUT_FILE_NAME);

    // Check if file found
    if (!InputStream)
    {
        cout << "'" << INPUT_FILE_NAME << "' file could not be found\n" << endl;
        system("pause");
        return false;
    }
    else
        cout << "Loading file: '" << INPUT_FILE_NAME << "'...\n" << endl;


    // Placeholder variables for input stream
    char operatorType;
    double N1;
    double D1;
    double N2;
    double D2;
    CFraction resultant;

    // Checks how many rows there are
    string line;
    int rows = 0;
    if (InputStream.is_open())
    {
        while (!InputStream.eof())
        {
            getline(InputStream, line);
            rows++;
        }
    }
    // Hits end of file so we close and open it again.
    InputStream.close();
    InputStream.open(INPUT_FILE_NAME);

    // Read through the file
    // Rows
    for (int row = 0; row < rows; row++) {
        // Type of operations
        InputStream >> operatorType;
        // Columns
        for (int column = 0; column < 1; column++) {
            // Fractions
            InputStream >> N1 >> D1 >> N2 >> D2;
            //cout << operatorType << " " << N1 << " " << D1 << " " << N2 << " " << D2 << endl; // Debugging
            // In case a number is missing
            if (InputStream.fail())
                InputStream.clear();

            // Static cast removes possible data loss warning
            CFraction frac1(static_cast<int>(N1), static_cast<int>(D1));
            CFraction frac2(static_cast<int>(N2), static_cast<int>(D2));

            // Checks type of operation and does appropriate operation 
            if (operatorType == 'a') {
                OutputStream << frac1 << " + " << frac2 << " = ";
                cout << frac1 << " + " << frac2 << " = ";
                resultant = frac1 + frac2;
                resultant.improperToMixed(resultant, OutputStream);
                OutputStream << endl;
                cout << endl;
            }
            else if (operatorType == 's') {
                OutputStream << frac1 << " - " << frac2 << " = ";
                cout << frac1 << " - " << frac2 << " = ";
                resultant = frac1 - frac2;
                resultant.improperToMixed(resultant, OutputStream);
                OutputStream << endl;
                cout << endl;
            }
            else if (operatorType == 'm') {
                OutputStream << frac1 << " * " << frac2 << " = ";
                cout << frac1 << " * " << frac2 << " = ";
                resultant = frac1 * frac2;
                resultant.improperToMixed(resultant, OutputStream);
                OutputStream << endl;
                cout << endl;
            }
            else if (operatorType == 'd') {
                OutputStream << frac1 << " / " << frac2 << " = ";
                cout << frac1 << " / " << frac2 << " = ";
                resultant = frac1 / frac2;
                resultant.improperToMixed(resultant, OutputStream);
                OutputStream << endl;
                cout << endl;
            }
            else if (operatorType == 'A') {
                OutputStream << frac1 << " + " << N2 << " = ";
                cout << frac1 << " + " << N2 << " = ";
                resultant = frac1 + N2;
                resultant.improperToMixed(resultant, OutputStream);
                OutputStream << endl;
                cout << endl;
            }
            else if (operatorType == 'S') {
                OutputStream << frac1 << " - " << N2 << " = ";
                cout << frac1 << " - " << N2 << " = ";
                resultant = frac1 - N2;
                resultant.improperToMixed(resultant, OutputStream);
                OutputStream << endl;
                cout << endl;
            }
            else if (operatorType == 'M') {
                OutputStream << frac1 << " * " << N2 << " = ";
                cout << frac1 << " * " << N2 << " = ";
                resultant = frac1 * N2;
                resultant.improperToMixed(resultant, OutputStream);
                OutputStream << endl;
                cout << endl;
            }
            else if (operatorType == 'D') {
                OutputStream << frac1 << " / " << N2 << " = ";
                cout << frac1 << " / " << N2 << " = ";
                resultant = frac1 / N2;
                resultant.improperToMixed(resultant, OutputStream);
                OutputStream << endl;
                cout << endl;
            }
            else if (operatorType == 'c') {
                if (frac1 < frac2) {
                    OutputStream << frac1 << " is less than " << frac2 << endl;
                    cout << frac1 << " is less than " << frac2 << endl;
                }
                else {
                    OutputStream << frac2 << " is less than " << frac1 << endl;
                    cout << frac2 << " is less than " << frac1 << endl;
                }
            }
            OutputStream << endl;
            cout << endl;
        }
    }
    // Closes input stream object
    InputStream.close();
    return true;
}

// Fractions from user input
void inputFracs(ofstream& OutputStream) {
    // Input
    float float_num;
    cout << "Enter a float number: ";
    cin >> float_num;
    cout << endl;

    // Inputs and calculations
    OutputStream << "Fraction addition" << endl;
    cout << "Fraction addition" << endl;
    CFraction fracInput_Add;
    cin >> fracInput_Add;
    OutputStream << fracInput_Add << " + " << float_num << " = ";
    cout << fracInput_Add << " + " << float_num << " = ";
    fracInput_Add = fracInput_Add + float_num;
    fracInput_Add.improperToMixed(fracInput_Add, OutputStream);
    OutputStream << endl << endl;
    cout << endl << endl;

    OutputStream << "Fraction subtraction" << endl;
    cout << "Fraction subtraction" << endl;
    CFraction fracInput_Sub;
    cin >> fracInput_Sub;
    OutputStream << fracInput_Sub << " - " << float_num << " = ";
    cout << fracInput_Sub << " - " << float_num << " = ";
    fracInput_Sub = fracInput_Sub - float_num;
    fracInput_Sub.improperToMixed(fracInput_Sub, OutputStream);
    OutputStream << endl << endl;
    cout << endl << endl;

    OutputStream << "Fraction multiplication" << endl;
    cout << "Fraction multiplication" << endl;
    CFraction fracInput_Multi;
    cin >> fracInput_Multi;
    OutputStream << fracInput_Multi << " * " << float_num << " = ";
    cout << fracInput_Multi << " * " << float_num << " = ";
    fracInput_Multi = fracInput_Multi * float_num;
    fracInput_Multi.improperToMixed(fracInput_Multi, OutputStream);
    OutputStream << endl << endl;
    cout << endl << endl;

    OutputStream << "Fraction division" << endl;
    cout << "Fraction division" << endl;
    CFraction fracInput_Div;
    cin >> fracInput_Div;
    OutputStream << fracInput_Div << " / " << float_num << " = ";
    cout << fracInput_Div << " / " << float_num << " = ";
    fracInput_Div = fracInput_Div / float_num;
    fracInput_Div.improperToMixed(fracInput_Div, OutputStream);
    OutputStream << endl << endl;
    cout << endl << endl;
}


int main() {
    // Input and output file names
    const string INPUT_FILE_NAME = "Inputs.txt";
    const string OUTPUT_FILE_NAME = "Outputs.txt";

    ofstream OutputStream;
    OutputStream.open(OUTPUT_FILE_NAME);

    // Functions
    readFracsFromFile(INPUT_FILE_NAME, OutputStream);

    inputFracs(OutputStream);
    // Closes output stream object
    OutputStream.close();

    // Count how many objects of CFractions class were created
    CFraction count;
    OutputStream << "Number of CFractions object(s) created: " << count.getcount() << endl << endl;
    cout << "Number of CFractions object(s) created: " << count.getcount() << endl << endl;

    system("pause");
    return 0;
}