import os
import mysql.connector
from dotenv import load_dotenv
from hubspot import HubSpot
from hubspot.crm.contacts.exceptions import ApiException

# Charger les variables d'environnement à partir du fichier .env
load_dotenv()

# Utiliser les variables d'environnement dans votre script
DB_HOST = os.getenv('DB_HOST')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_DATABASE = os.getenv('DB_DATABASE')
HUBSPOT_API_KEY = os.getenv('KEY')  

# Connexion à HubSpot
api_client = HubSpot(access_token=HUBSPOT_API_KEY)

# Récupérer tous les contacts
try:
    all_contacts_response = api_client.crm.contacts.get_all()

    # Connexion à la base de données MySQL
    conn = mysql.connector.connect(
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASSWORD,
    database=DB_DATABASE
)
    cursor = conn.cursor()

    # Insertion des contacts dans la base de données MySQL
    for contact in all_contacts_response:
        email = contact.properties['email']
        Prenom = contact.properties['firstname']
        nom = contact.properties['lastname']
        cursor.execute("INSERT INTO contacts (email, Prenom, nom) VALUES (%s, %s, %s)", (email, Prenom, nom))
    
    # Validation des modifications et fermeture de la connexion
    conn.commit()
    conn.close()
    
    print("Données insérées avec succès dans la base de données MySQL.")
except ApiException as e:
    print("Exception lors de la récupération des contacts depuis HubSpot: %s\n" % e)
except mysql.connector.Error as e:
    print("Erreur lors de l'accès à la base de données MySQL: %s\n" % e)
