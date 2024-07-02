import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection | null = null;
  private db: SQLiteDBConnection | null = null;
  private webStorage: Storage | null = null;
  readonly dbName: string = "travelmate.db";
  readonly tableName: string = "session_data";

  constructor() {
    this.initializeDatabase();
  }

  async initializeDatabase() {
    if (Capacitor.getPlatform() === 'web') {
      this.webStorage = window.localStorage;
      console.log('Usando almacenamiento web para simular base de datos');
    } else {
      try {
        this.sqlite = new SQLiteConnection(CapacitorSQLite);
        const ret = await this.sqlite.checkConnectionsConsistency();
        const isConn = await this.sqlite.isConnection(this.dbName, false);
        if (ret.result && isConn.result) {
          this.db = await this.sqlite.retrieveConnection(this.dbName, false);
        } else {
          this.db = await this.sqlite.createConnection(this.dbName, false, "no-encryption", 1, false);
        }
        await this.db.open();
        await this.createTable();
        console.log('Base de datos SQLite inicializada correctamente');
      } catch (error) {
        console.error('Error al inicializar la base de datos SQLite:', error);
      }
    }
  }

  private async createTable() {
    if (this.db) {
      const query = `
        CREATE TABLE IF NOT EXISTS ${this.tableName} (
          user_name TEXT PRIMARY KEY,
          password TEXT NOT NULL,
          active INTEGER NOT NULL
        )
      `;
      try {
        await this.db.execute(query);
        console.log('Tabla creada o ya existente en SQLite');
      } catch (error) {
        console.error('Error al crear la tabla en SQLite:', error);
      }
    }
  }

  async addUser(username: string, password: string) {
    if (this.webStorage) {
      const user = JSON.stringify({ username, password, active: 1 });
      this.webStorage.setItem(username, user);
      console.log('Usuario añadido al almacenamiento web:', username);
    } else if (this.db) {
      const query = `INSERT INTO ${this.tableName} (user_name, password, active) VALUES (?, ?, ?)`;
      try {
        await this.db.run(query, [username, password, 1]);
        console.log('Usuario añadido a SQLite:', username);
      } catch (error) {
        console.error('Error al añadir usuario a SQLite:', error);
        throw error;
      }
    }
  }

  async getUser(username: string) {
    if (this.webStorage) {
      const user = this.webStorage.getItem(username);
      const parsedUser = user ? JSON.parse(user) : null;
      console.log('Usuario obtenido del almacenamiento web:', parsedUser);
      return parsedUser;
    } else if (this.db) {
      const query = `SELECT * FROM ${this.tableName} WHERE user_name = ?`;
      try {
        const result = await this.db.query(query, [username]);
        console.log('Usuario obtenido de SQLite:', result?.values?.[0]);
        return result?.values?.[0];
      } catch (error) {
        console.error('Error al obtener usuario de SQLite:', error);
        throw error;
      }
    }
    return null;
  }

  async updateSessionStatus(username: string, active: number) {
    if (this.webStorage) {
      const user = this.webStorage.getItem(username);
      if (user) {
        const parsedUser = JSON.parse(user);
        parsedUser.active = active;
        this.webStorage.setItem(username, JSON.stringify(parsedUser));
        console.log('Estado de sesión actualizado en almacenamiento web para:', username);
      }
    } else if (this.db) {
      const query = `UPDATE ${this.tableName} SET active = ? WHERE user_name = ?`;
      try {
        await this.db.run(query, [active, username]);
        console.log('Estado de sesión actualizado en SQLite para:', username);
      } catch (error) {
        console.error('Error al actualizar estado de sesión en SQLite:', error);
        throw error;
      }
    }
  }

  async checkActiveSession() {
    if (this.webStorage) {
      for (let i = 0; i < this.webStorage.length; i++) {
        const key = this.webStorage.key(i);
        if (key) {
          const user = JSON.parse(this.webStorage.getItem(key) || '{}');
          if (user.active === 1) {
            console.log('Sesión activa encontrada en almacenamiento web');
            return true;
          }
        }
      }
      console.log('No se encontró sesión activa en almacenamiento web');
      return false;
    } else if (this.db) {
      const query = `SELECT * FROM ${this.tableName} WHERE active = ?`;
      try {
        const result = await this.db.query(query, [1]);
        const hasActiveSession = result?.values && result.values.length > 0;
        console.log('Sesión activa en SQLite:', hasActiveSession);
        return hasActiveSession;
      } catch (error) {
        console.error('Error al verificar sesión activa en SQLite:', error);
        throw error;
      }
    }
    return false;
  }
}