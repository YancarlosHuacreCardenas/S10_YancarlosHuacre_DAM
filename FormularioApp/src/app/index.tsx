import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';

import { AppInput } from '../components/common/app-input';
import { AppButton } from '../components/common/app-button';
import {
  validarNombre,
  validarCorreo,
  validarCurso,
  validarEdad,
} from '../utils/validators';

export default function RegistroCurso() {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [curso, setCurso] = useState('');
  const [edad, setEdad] = useState('');

  // Estados de retroalimentación
  const [error, setError] = useState('');
  const [registrado, setRegistrado] = useState(false);
  const [datosGuardados, setDatosGuardados] = useState<{
    nombre: string;
    correo: string;
    curso: string;
    edad: string;
  } | null>(null);

  // Validaciones en tiempo real
  const nombreValido = validarNombre(nombre);
  const correoValido = validarCorreo(correo);
  const cursoValido = validarCurso(curso);
  const edadValida = validarEdad(edad);

  const cursosSugeridos = [
    'Desarrollo Móvil (React Native)',
    'Desarrollo Web Full Stack',
    'Base de Datos Avanzada',
    'Inteligencia Artificial',
  ];

  const validarFormulario = () => {
    setError('');
    setRegistrado(false);

    // Validación 1: Nombre
    if (!nombre.trim()) {
      setError('El nombre del estudiante es obligatorio.');
      return;
    }
    if (!nombreValido) {
      setError('El nombre debe tener al menos 3 caracteres.');
      return;
    }

    // Validación 2: Correo
    if (!correo.trim()) {
      setError('El correo electrónico es obligatorio.');
      return;
    }
    if (!correoValido) {
      setError('Ingresa un correo electrónico válido (debe incluir @ y dominio).');
      return;
    }

    // Validación 3: Curso
    if (!curso.trim()) {
      setError('El nombre del curso es obligatorio.');
      return;
    }
    if (!cursoValido) {
      setError('El curso debe tener al menos 3 caracteres.');
      return;
    }

    // Validación 4: Edad
    if (!edad.trim()) {
      setError('La edad es obligatoria.');
      return;
    }
    if (!edadValida) {
      setError('La edad debe ser un número válido entre 16 y 99 años.');
      return;
    }

    // Si todo es válido
    setDatosGuardados({
      nombre: nombre.trim(),
      correo: correo.trim(),
      curso: curso.trim(),
      edad: edad.trim(),
    });
    setRegistrado(true);
  };

  const limpiarFormulario = () => {
    setNombre('');
    setCorreo('');
    setCurso('');
    setEdad('');
    setError('');
    setRegistrado(false);
    setDatosGuardados(null);
  };

  const totalValidaciones = 4;
  const validacionesCompletadas = [
    nombreValido,
    correoValido,
    cursoValido,
    edadValida,
  ].filter(Boolean).length;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ENCABEZADO */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>📚</Text>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.badgeTop}>ACTIVIDAD INDIVIDUAL • S10 | AP5</Text>
            <Text style={styles.title}>Registro de Curso</Text>
            <Text style={styles.subtitle}>Opción 5: Formulario y Validaciones</Text>
          </View>
        </View>

        <Text style={styles.description}>
          Completa los datos del estudiante para inscribirse en el curso académico seleccionado.
        </Text>

        {/* TARJETA DEL FORMULARIO */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Datos de Inscripción</Text>
          <Text style={styles.sectionDescription}>
            Todos los campos marcados con (*) son obligatorios.
          </Text>

          {/* CAMPO 1: NOMBRE ESTUDIANTE */}
          <AppInput
            label="Nombre del estudiante *"
            placeholder="Ej. Yancarlos Huacre"
            value={nombre}
            onChangeText={(value) => {
              setNombre(value);
              setError('');
              setRegistrado(false);
            }}
          />
          {nombre.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                nombreValido ? styles.validText : styles.invalidText,
              ]}
            >
              {nombreValido
                ? '✓ Nombre válido'
                : '○ Mínimo 3 caracteres'}
            </Text>
          )}

          {/* CAMPO 2: CORREO */}
          <AppInput
            label="Correo electrónico *"
            placeholder="ejemplo@correo.com"
            value={correo}
            onChangeText={(value) => {
              setCorreo(value);
              setError('');
              setRegistrado(false);
            }}
            keyboardType="email-address"
          />
          {correo.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                correoValido ? styles.validText : styles.invalidText,
              ]}
            >
              {correoValido
                ? '✓ Correo válido (@)'
                : '○ Debe incluir @ y formato válido'}
            </Text>
          )}

          {/* CAMPO 3: CURSO */}
          <AppInput
            label="Curso a matricular *"
            placeholder="Ej. Desarrollo de Aplicaciones Móviles"
            value={curso}
            onChangeText={(value) => {
              setCurso(value);
              setError('');
              setRegistrado(false);
            }}
          />

          {/* Chips de cursos sugeridos */}
          <Text style={styles.sugerenciasLabel}>Sugerencias rápidas:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipsContainer}
          >
            {cursosSugeridos.map((item, idx) => (
              <Pressable
                key={idx}
                style={[
                  styles.chip,
                  curso === item && styles.chipSelected,
                ]}
                onPress={() => {
                  setCurso(item);
                  setError('');
                  setRegistrado(false);
                }}
              >
                <Text
                  style={[
                    styles.chipText,
                    curso === item && styles.chipTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {curso.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                cursoValido ? styles.validText : styles.invalidText,
              ]}
            >
              {cursoValido
                ? '✓ Curso especificado'
                : '○ Ingrese el nombre del curso'}
            </Text>
          )}

          {/* CAMPO 4: EDAD */}
          <AppInput
            label="Edad del estudiante *"
            placeholder="Ej. 20"
            value={edad}
            onChangeText={(value) => {
              setEdad(value);
              setError('');
              setRegistrado(false);
            }}
            keyboardType="numeric"
          />
          {edad.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                edadValida ? styles.validText : styles.invalidText,
              ]}
            >
              {edadValida
                ? '✓ Edad permitida (≥ 16 años)'
                : '○ La edad debe ser ≥ 16 años'}
            </Text>
          )}

          {/* MENSAJE DE ERROR */}
          {error !== '' && (
            <View style={styles.errorBox}>
              <View style={styles.errorIcon}>
                <Text style={styles.errorIconText}>!</Text>
              </View>
              <View style={styles.messageContainer}>
                <Text style={styles.errorTitle}>Error de Validación</Text>
                <Text style={styles.errorMessage}>{error}</Text>
              </View>
            </View>
          )}

          {/* MENSAJE DE ÉXITO */}
          {registrado && datosGuardados && (
            <View style={styles.successBox}>
              <View style={styles.successIcon}>
                <Text style={styles.successIconText}>✓</Text>
              </View>
              <View style={styles.messageContainer}>
                <Text style={styles.successTitle}>¡Inscripción Exitosa!</Text>
                <Text style={styles.successMessage}>
                  El estudiante ha sido registrado correctamente en el curso.
                </Text>

                {/* RESUMEN DE DATOS */}
                <View style={styles.summaryBox}>
                  <Text style={styles.summaryItem}>
                    👤 <Text style={styles.summaryBold}>Estudiante:</Text> {datosGuardados.nombre}
                  </Text>
                  <Text style={styles.summaryItem}>
                    ✉️ <Text style={styles.summaryBold}>Correo:</Text> {datosGuardados.correo}
                  </Text>
                  <Text style={styles.summaryItem}>
                    📖 <Text style={styles.summaryBold}>Curso:</Text> {datosGuardados.curso}
                  </Text>
                  <Text style={styles.summaryItem}>
                    🎂 <Text style={styles.summaryBold}>Edad:</Text> {datosGuardados.edad} años
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* BOTÓN DE ACCIÓN PRINCIPAL */}
          <AppButton
            title="Registrar Curso"
            onPress={validarFormulario}
          />

          {/* BOTÓN LIMPIAR */}
          {(nombre !== '' || correo !== '' || curso !== '' || edad !== '') && (
            <Pressable
              style={styles.clearButton}
              onPress={limpiarFormulario}
            >
              <Text style={styles.clearButtonText}>Limpiar Formulario</Text>
            </Pressable>
          )}
        </View>

        {/* PANEL DE VALIDACIONES */}
        <View style={styles.validationSection}>
          <View style={styles.validationHeader}>
            <View>
              <Text style={styles.validationTitle}>Validaciones en Vivo</Text>
              <Text style={styles.validationSubtitle}>
                Reglas requeridas para la actividad
              </Text>
            </View>

            <View style={styles.counter}>
              <Text style={styles.counterText}>
                {validacionesCompletadas}/{totalValidaciones}
              </Text>
            </View>
          </View>

          {/* VALIDACIÓN 1 */}
          <ValidationRow
            title="Nombre estudiante"
            description="Obligatorio, mínimo 3 caracteres."
            valid={nombreValido}
          />

          {/* VALIDACIÓN 2 */}
          <ValidationRow
            title="Correo con @"
            description="Formato de correo electrónico válido con @."
            valid={correoValido}
          />

          {/* VALIDACIÓN 3 */}
          <ValidationRow
            title="Curso requerido"
            description="Nombre del curso a matricular no vacío."
            valid={cursoValido}
          />

          {/* VALIDACIÓN 4 */}
          <ValidationRow
            title="Edad válida"
            description="Valor numérico válido (mayor o igual a 16)."
            valid={edadValida}
          />
        </View>

        {/* PIE DE PÁGINA */}
        <Text style={styles.footer}>
          Desarrollo de Aplicaciones Móviles • Semana 10 • AP5
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* COMPONENTE PARA FILA DE VALIDACIÓN */
type ValidationRowProps = {
  title: string;
  description: string;
  valid: boolean;
};

function ValidationRow({ title, description, valid }: ValidationRowProps) {
  return (
    <View style={styles.validationRow}>
      <View
        style={[
          styles.validationCircle,
          valid ? styles.validationCircleValid : styles.validationCirclePending,
        ]}
      >
        <Text
          style={[
            styles.validationIcon,
            valid ? styles.validationIconValid : styles.validationIconPending,
          ]}
        >
          {valid ? '✓' : '○'}
        </Text>
      </View>

      <View style={styles.validationInfo}>
        <Text style={styles.validationRowTitle}>{title}</Text>
        <Text style={styles.validationRowDescription}>{description}</Text>
      </View>

      <View
        style={[
          styles.statusBadge,
          valid ? styles.statusBadgeValid : styles.statusBadgePending,
        ]}
      >
        <Text
          style={[
            styles.statusBadgeText,
            valid ? styles.statusBadgeTextValid : styles.statusBadgeTextPending,
          ]}
        >
          {valid ? 'VÁLIDO' : 'PENDIENTE'}
        </Text>
      </View>
    </View>
  );
}

/* ESTILOS */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scroll: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 40,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#4338CA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    shadowColor: '#4338CA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  headerIconText: {
    fontSize: 28,
  },
  headerTextContainer: {
    flex: 1,
  },
  badgeTop: {
    fontSize: 10,
    fontWeight: '800',
    color: '#4F46E5',
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    color: '#4B5563',
    marginBottom: 20,
  },

  /* TARJETA DEL FORMULARIO */
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 18,
  },

  /* CHIPS DE SUGERENCIA */
  sugerenciasLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
    marginTop: -8,
    marginBottom: 8,
  },
  chipsContainer: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  chip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chipSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4B5563',
  },
  chipTextSelected: {
    color: '#4338CA',
    fontWeight: '700',
  },

  /* ESTADO DE CAMPOS */
  fieldStatus: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: -10,
    marginBottom: 14,
  },
  validText: {
    color: '#16A34A',
  },
  invalidText: {
    color: '#D97706',
  },

  /* ERROR */
  errorBox: {
    flexDirection: 'row',
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  errorIconText: {
    color: '#DC2626',
    fontSize: 15,
    fontWeight: '900',
  },
  messageContainer: {
    flex: 1,
  },
  errorTitle: {
    color: '#991B1B',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },
  errorMessage: {
    color: '#B42318',
    fontSize: 12,
    lineHeight: 16,
  },

  /* ÉXITO */
  successBox: {
    flexDirection: 'row',
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  successIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  successIconText: {
    color: '#16A34A',
    fontSize: 16,
    fontWeight: '900',
  },
  successTitle: {
    color: '#166534',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  successMessage: {
    color: '#15803D',
    fontSize: 12,
    marginBottom: 8,
  },
  summaryBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  summaryItem: {
    fontSize: 12,
    color: '#1F2937',
    marginBottom: 3,
  },
  summaryBold: {
    fontWeight: '700',
    color: '#111827',
  },

  /* BOTÓN LIMPIAR */
  clearButton: {
    marginTop: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  /* PANEL DE VALIDACIONES */
  validationSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  validationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  validationTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 2,
  },
  validationSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  counter: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '800',
  },

  /* FILAS DE VALIDACIÓN */
  validationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  validationCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  validationCircleValid: {
    backgroundColor: '#DCFCE7',
  },
  validationCirclePending: {
    backgroundColor: '#F3F4F6',
  },
  validationIcon: {
    fontSize: 14,
    fontWeight: '800',
  },
  validationIconValid: {
    color: '#16A34A',
  },
  validationIconPending: {
    color: '#9CA3AF',
  },
  validationInfo: {
    flex: 1,
  },
  validationRowTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  validationRowDescription: {
    fontSize: 11,
    color: '#6B7280',
    lineHeight: 15,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 6,
  },
  statusBadgeValid: {
    backgroundColor: '#ECFDF3',
  },
  statusBadgePending: {
    backgroundColor: '#F3F4F6',
  },
  statusBadgeText: {
    fontSize: 9,
    fontWeight: '800',
  },
  statusBadgeTextValid: {
    color: '#027A48',
  },
  statusBadgeTextPending: {
    color: '#6B7280',
  },

  /* FOOTER */
  footer: {
    textAlign: 'center',
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 24,
  },
});