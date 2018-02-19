#include <FirebaseArduino.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>

#include <Adafruit_NeoPixel.h>

// Set these to run example.
#define FIREBASE_HOST "*******"
#define FIREBASE_AUTH "*******"
#define WIFI_SSID "*******"
#define WIFI_PASSWORD "*******"

#define PIN            2 //sets the pin on which the neopixels are connected
#define NUMPIXELS      50 //defines the number of pixels in the strip
#define interval       50 //defines the delay interval between running the functions

Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

float activeColor[] = {0, 0, 0};
String color;
int bright;
const char* host = "*******";
String url = "*******";
long previousMillis = 0; // a long value to store the millis()
int breather = 0; //sets the brightness value in breather()
boolean dir = true; //sets the direction in breather()-breathing in or out, and cylonChaser()-left or right
int l = 0; //sets the color value to send to Wheel in newTheatreChaseRainbow() and newRainbow()
int m = 0; //sets the color value in newRainbowCycle()

void setup() {
  Serial.begin(9600);

  pixels.begin();
  pixels.setBrightness(30); // 0 ... 255
  pixels.show(); // Initialize all pixels to 'off'

  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) // Wait for connection
  {
    delay(500);//sets a delay to wait for the access point to create the connection
    Serial.print(".");//adds a dot for each half second that the connection is not established
  }  
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}


void loop() {

  FirebaseObject base = Firebase.get("*******");
  if (Firebase.failed()) {
      Serial.println("Firebase get failed");
      Serial.println(Firebase.error());
      return;
  }
  if(color != base.getString(String("hex"))){
    color = base.getString(String("hex"));
    handle_color(color);
    delay(2000);
  }
  if(bright != base.getInt(String("brightness"))){
    bright = base.getInt(String("brightness"));
    pixels.setBrightness(bright);
    delay(2000);
  }
  if(color != base.getString(String("color")) == "rainbow"){
    color = base.getString(String("color"));
    newRainbow();
    delay(2000);
  }
  if(color != base.getString(String("color")) == "pulse"){
    color = base.getString(String("color"));
    breathe();
    delay(2000);
  }
}



void handle_color(String color){
  String color1 = color;

  if (color1.indexOf("%23") >= 0)//if the string has %23 which is "#"
  {
    color = "#";//add it in as a usable character
    color += color1.substring((color1.indexOf("%23") + 3));//add in the color code
  }

  String r = "0x" + color.substring(1, 3);//sets string r to a string of the byte value
  String g = "0x" + color.substring(3, 5);//same as above
  String b = "0x" + color.substring(5, 7);

  const char *r1 = r.c_str(); //converts the string to a const char to convert to RGB values below
  const char *g1 = g.c_str(); //same as above
  const char *b1 = b.c_str();
  int red = RGBValue(r1);//converts to RGB value
  int green = RGBValue(g1);
  int blue = RGBValue(b1);

  writeLEDS(red, green, blue);//sets up the pixels to the color chosen
  activeColor[0] = red; //sets the color chosen as the activeColor to be used in other functions
  activeColor[1] = green;
  activeColor[2] = blue;
}

unsigned int RGBValue(const char * s)//converts the value to an RGB value
{
  unsigned int result = 0;
  int c ;
  if ('0' == *s && 'x' == *(s + 1)) {
    s += 2;
    while (*s) {
      result = result << 4;
      if (c = (*s - '0'), (c >= 0 && c <= 9)) result |= c;
      else if (c = (*s - 'A'), (c >= 0 && c <= 5)) result |= (c + 10);
      else if (c = (*s - 'a'), (c >= 0 && c <= 5)) result |= (c + 10);
      else break;
      ++s;
    }
  }
  return result;
}

void writeLEDS(byte R, byte G, byte B){
  for (int i = 0; i < pixels.numPixels(); i ++){
    pixels.setPixelColor(i, pixels.Color(R, G, B));
  }
  pixels.show();
}

void liturgicalColor(){
// Use WiFiClient class to create TCP connections
  WiFiClient client;
  const int httpPort = 80;
  if (!client.connect(host, httpPort)) {Serial.println("connection failed");return;}
  client.print(String("GET ") + url + " HTTP/1.1\r\n" + "Host: " + host + "\r\n" + "Connection: close\r\n\r\n");
  unsigned long timeout = millis();
  while (client.available() == 0) {if (millis() - timeout > 5000) {Serial.println(">>> Client Timeout !");client.stop();return;}}

  String json = "";
  boolean httpBody = false;
  while (client.available()) {
    String line = client.readStringUntil('\r');
    if (!httpBody && line.charAt(1) == '{') {httpBody = true;}
    if (httpBody) {json += line;}
  }
  StaticJsonBuffer<400> jsonBuffer;
  JsonObject& root = jsonBuffer.parseObject(json);
  String color = root["color"];

  String r = "0x" + color.substring(1, 3);//sets string r to a string of the byte value
  String g = "0x" + color.substring(3, 5);//same as above
  String b = "0x" + color.substring(5, 7);
  
  const char *r1 = r.c_str(); //converts the string to a const char to convert to RGB values below
  const char *g1 = g.c_str(); //same as above
  const char *b1 = b.c_str();

  int red = RGBValue(r1);//converts to RGB value
  int green = RGBValue(g1);
  int blue = RGBValue(b1);

  writeLEDS(red, green, blue);//sets up the pixels to the color chosen
}

void breathing()
{
  if (millis() - previousMillis > interval * 2) //if the timer has reached its delay value
  {
    writeLEDS((activeColor[0] / 255) * breather, (activeColor[1] / 255) * breather, (activeColor[2] / 255) * breather); //write the leds to the color and brightness level
    if (dir == true) //if the lights are coming on
    {
      if (breather < 255) //once the value is less than 255
      {
        breather = breather + 15; //adds 15 to the brightness level for the next time
      }
      else if (breather >= 255) //if the brightness is greater or equal to 255
      {
        dir = false; //sets the direction to false
      }
    }
    if (dir == false) //if the lights are going off
    {
      if (breather > 0)
      {
        breather = breather - 15; //takes 15 away from the brightness level
      }
      else if (breather <= 0) //if the brightness level is nothing
        dir = true; //changes the direction again to on
    }
    previousMillis = millis();
  }
}

void newRainbow()
{
  if (millis() - previousMillis > interval * 2)
  {
    for (int h = 0; h < pixels.numPixels(); h++)
    {
      pixels.setPixelColor(h, Wheel((h + l) & 255));
    }
    l++;
    if (l >= 256)
      l = 0;
    pixels.show();
    previousMillis = millis();
  }
}

uint32_t Wheel(byte WheelPos) {
  WheelPos = 255 - WheelPos;
  if (WheelPos < 85) {
    return pixels.Color(255 - WheelPos * 3, 0, WheelPos * 3);
  }
  if (WheelPos < 170) {
    WheelPos -= 85;
    return pixels.Color(0, WheelPos * 3, 255 - WheelPos * 3);
  }
  WheelPos -= 170;
  return pixels.Color(WheelPos * 3, 255 - WheelPos * 3, 0);
}

